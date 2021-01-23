<template>
	<div class="card" v-if="task">
		<h2>{{ task.title }}</h2>
		<p>
			<strong>Статус</strong>:
			<AppStatus :status="task.status"/>
		</p>
		<p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
		<p><strong>Описание</strong>: {{ task.description }}</p>
		<div>
			<button class="btn" @click="changeStatus('pending')">Взять в работу</button>
			<button class="btn primary" @click="changeStatus('done')">Завершить</button>
			<button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
		</div>
	</div>
	<h3 class="text-white center" v-else>
		Задачи с id = <strong>{{ id }}</strong> нет.
	</h3>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()
		const id = Number(route.params.id)
		const task = computed(() => store.getters.getTaskById(id))
		const changeStatus = status => store.dispatch('updateStatus', {id, status})

		return {
			id,
			task,
			changeStatus,
		}
	},
	components: { AppStatus }
}
</script>

