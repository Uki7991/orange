<template>
    <div>
        <h2>Акции на продажу</h2>
        <ul class="max-h-[90vh] overflow-auto flex flex-col gap-8">
            <li v-for="stock in sellStocks">
                <StockComponent :stock="stock" action-title="'Buy'" :action="buy" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const sellStocks = ref([]);
const token = '64f071177c48764f071177c48a';
const baseUrl = 'https://datsorange.devteam.games'

onMounted(() => {
    setInterval(() => {
        $fetch(baseUrl + '/sellStock', {
            headers: {
                'token': token,
            }
        }).then((res) => {
            sellStocks.value = res.filter(i => i.bids.length)
                .sort((a, b) => {
                    a.bids.sort((a, b) => a.price - b.price);
                    b.bids.sort((a, b) => a.price - b.price);
                    return a.bids[0].price - b.bids[0].price
                });
        })
    }, 8000)
})

const emit = defineEmits(['request'])

const buy = async (id, quantity) => {
    const url = baseUrl + '/BestPriceBuy';
    emit('request', url, {
        symbolId: id,
        quantity,
    })
}
</script>

<style scoped>

</style>