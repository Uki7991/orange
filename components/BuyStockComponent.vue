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

const props = defineProps({
    assets: {
        type: Array,
    }
});
const {assets} = props;

onMounted(() => {
    const assetIds = assets?.map(i => i.id);
    setInterval(() => {
        $fetch(baseUrl + '/buyStock', {
            headers: {
                'token': token,
            }
        }).then((res) => {
            buyStocks.value = res.filter(i => i.bids.length && assetIds?.includes(i.id))
                .sort((a, b) => {
                    a.bids.sort((a, b) => b.price - a.price);
                    b.bids.sort((a, b) => b.price - a.price);
                    return b.bids[0].price - a.bids[0].price
                });
        })
    }, 5000)
})

watch(buyStocks, (value) => {
    console.log(value)
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