<template>
	<span class="badge" :class="type">{{ text }}</span>
</template>

<script>
const statuses = {
	active: { text: 'Активен', type: 'primary' },
	done: { text: 'Завершен', type: 'primary' },
	cancelled: { text: 'Отменен', type: 'danger' },
	pending: { text: 'Выполняется', type: 'warning' },
}
import { ref, onUpdated } from 'vue'
export default {
	props: {
		status: {
			type: String,
			required: true,
			validator(value) {
				return Object.keys(statuses).includes(value)
			}
		}
	},
	setup(props) {
		const type = ref(statuses[props.status].type)
		const text = ref(statuses[props.status].text)

		onUpdated(() => {
			type.value = statuses[props.status].type
			text.value = statuses[props.status].text
		})

		return {
			type,
			text
		}
	}
}
</script>
