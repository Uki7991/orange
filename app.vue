<template>
    <div>
        Баланс: <span>${{ balance?.assets?.length ? balance?.assets[0]?.quantity : 0 }}</span>
    </div>
    <div>
        Сообщение: <span>{{ errorMessage }}</span>
    </div>
  <div class="flex gap-4">

      <div class="w-1/5">
          <h2>Акции</h2>
          <ul class="max-h-[90vh] overflow-auto">
              <li @click="setCurrent(asset)" v-for="asset in balance.assets?.filter(i => i.quantity)">
                  {{ asset.id }} {{ asset.name }} {{ asset.quantity }}
              </li>
          </ul>
      </div>

      <SellStocksComponent class="w-1/5" @request="request" />

      <BuyStockComponent :assets="balance.assets" @request="request" class="w-1/5" />
      <NewsComponent class="w-1/5" />

  </div>
</template>


<script setup>
  const errorMessage = ref('');
  const stocks = ref([])
  const balance = ref(0);
  const token = '64f071177c48764f071177c48a';
  const baseUrl = 'https://datsorange.devteam.games'
  const stocksStore = useStocks()
  onMounted(async () => {
      await $fetch(baseUrl + '/getSymbols', {
          headers: {
              'token': token,
          }
      }).then((res) => {
          stocks.value = res.reduce((acc, item) => ({
                  ...acc,
                  [item.ticker]: {
                      ...item
                  },
              }
          ), {});
      });

      await fetchBalance();
  })

  const request = (url, data) => {
      $fetch(url, {
          method: 'POST',
          headers: {
              token: token
          },
          body: data
      }).then(res => {
          errorMessage.value = res.message;
          console.log(res)
          if (res?.length && res[0].message === 'Ok') {
              setTimeout(() => {
                  fetchBalance();
              }, 1000)
          }
      })
  }

  const fetchBalance = async () => {
      await $fetch(baseUrl + '/info', {
          headers: {
              'token': token,
          }
      }).then((res) => {
          balance.value = res;
      });
  }

  const setCurrent = (stock) => {
      stocksStore.setCurrent(stock);
  }

</script>