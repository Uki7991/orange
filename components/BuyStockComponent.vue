<template>
    <div>
        <h2>Акции на покупку</h2>
        <ul class="max-h-[90vh] overflow-auto flex flex-col gap-8">
            <li v-for="stock in buyStocks">
                <StockComponent :stock="stock" action-title="sell" :action="sell" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const buyStocks = ref([]);
const token = '64f071177c48764f071177c48a';
const baseUrl = 'https://datsorange.devteam.games'

const props = {
    request: {
        type: Function,
        required: true,
    }
};
const {request} = props;

onMounted(() => {
    setInterval(() => {
        $fetch(baseUrl + '/buyStock', {
            headers: {
                'token': token,
            }
        }).then((res) => {
            buyStocks.value = res.filter(i => i.bids.length)
                .sort((a, b) => {
                    a.bids.sort((a, b) => a.price - b.price);
                    b.bids.sort((a, b) => a.price - b.price);
                    return a.bids[0].price - b.bids[0].price
                });
        })
    }, 5000)
})

const emit = defineEmits(['request'])
const sell = async (id, quantity) => {
    const url = baseUrl + '/BestPriceSell';
    emit('request', url, {
        symbolId: id,
        quantity,
    })
}
</script>

<style scoped>

</style>