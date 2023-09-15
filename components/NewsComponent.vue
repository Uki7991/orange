<template>
    <div>
        <h2>Новости</h2>
        <ul class="max-h-[90vh] overflow-auto flex flex-col gap-4">
            <li v-for="article in news" class="bg-gray-100 rounded-lg p-4">
                <p><span class="font-semibold">{{ article.text }}</span> <span class="font-bold">{{ article.rate }}%</span></p>

                <p>
                    {{ article.companiesAffected.join(', ') }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup>
const news = ref([])
const token = '64f071177c48764f071177c48a';
const baseUrl = 'https://datsorange.devteam.games'
onMounted(() => {
    $fetch(baseUrl + '/news/LatestNews5Minutes', {
        headers: {
            'token': token,
        }
    }).then((res) => {
        news.value = res;
    })
    setInterval(() => {
        $fetch(baseUrl + '/news/LatestNews5Minutes', {
            headers: {
                'token': token,
            }
        }).then((res) => {
            news.value = res;
        })
    }, 60000)
})
</script>

<style scoped>

</style>