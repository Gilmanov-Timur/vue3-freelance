<template>
	<the-navbar></the-navbar>
	<div class="container with-nav">
		<router-view/>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import TheNavbar from './components/TheNavbar'

export default {
	setup() {
		const store = useStore()
		store.dispatch('loadTasks')
	},
	components: {
		TheNavbar
	}
}
</script>
