<template>
	<h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
	<template v-else>
		<h3 class="text-white">Всего активных задач: {{ activeTasksCount }}</h3>
		<div class="card" v-for="task in tasks" :key="task.id">
			<h2 class="card-title">
				{{ task.title }}
				<AppStatus :status="task.status"/>
			</h2>
			<p>
				<strong>
					<small>
						{{ new Date(task.date).toLocaleDateString() }}
					</small>
				</strong>
			</p>
			<button class="btn primary" @click="$router.push(`/task/${task.id}`)">Посмотреть</button>
		</div>
	</template>
</template>

<script>
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		const store = useStore()
		const tasks = store.getters.tasks
		const activeTasksCount = store.getters.activeTasksCount

		return {
			tasks,
			activeTasksCount,
		}
	},
	components: { AppStatus }
}
</script>
