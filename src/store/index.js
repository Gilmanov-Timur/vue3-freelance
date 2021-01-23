import {createStore} from 'vuex'

function saveToLocalStorage(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function validateTask(task) {
	const isExpired = new Date(task.date).getTime() < Date.now()
	return {
		...task,
		status: isExpired && task.status === 'active' ? 'cancelled' : task.status
	}
}

export default createStore({
	state: {
		tasks: []
	},
	getters: {
		tasks(state) {
			return state.tasks.map(task => (validateTask(task)))
		},
		activeTasksCount(state) {
			return state.tasks.filter(task => task.status === 'active').length
		},
		getTaskById: state => id => {
			return validateTask(state.tasks.find(task => task.id === id))
		}
	},
	mutations: {
		addTask(state, task) {
			state.tasks.push(task)
		},
		addTasks(state, tasks) {
			state.tasks = tasks
		},
		updateStatus(state, {id, status}) {
			const index = state.tasks.findIndex(task => task.id === id)
			state.tasks[index].status = status
		},
	},
	actions: {
		addTask({state, commit}, task) {
			commit('addTask', task)
			saveToLocalStorage(state.tasks)
		},
		loadTasks({commit}) {
			const tasks = localStorage.getItem('tasks')
			if (tasks) {
				commit('addTasks', JSON.parse(tasks))
			}
		},
		updateStatus({state, commit}, task) {
			commit('updateStatus', task)
			saveToLocalStorage(state.tasks)
		}
	},
})
