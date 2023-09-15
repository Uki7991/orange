<template>
    <div>
        Баланс: <span>${{ balance?.assets?.length ? balance?.assets[0]?.quantity : 0 }}</span>
    </div>
    <div>
        Сообщение: <span>{{ errorMessage }}</span>
    </div>
  <div class="flex gap-4">
    <div>
        <h2>Компании</h2>
        <ul class="max-h-[90vh] overflow-y">
            <li v-for="stock in Object.values(stocks)">
                {{ stock.id }} {{ stock.ticker }}
            </li>
        </ul>
    </div>

      <div>
          <h2>Акции</h2>
          <ul class="max-h-[90vh] overflow-auto">
              <li v-for="asset in balance.assets?.filter(i => i.quantity)">
                  {{ asset.id }} {{ asset.name }} {{ asset.quantity }}
              </li>
          </ul>
      </div>

      <SellStocksComponent @request="request" />

      <BuyStockComponent @request="request" />

      <div>
          <h2>Новости</h2>
          <ul class="max-h-[90vh] overflow-auto">
              <li v-for="article in news">
                  {{ article.text }} {{ article.rate }}%
              </li>
          </ul>
      </div>
  </div>
</template>


<script setup>
  const errorMessage = ref('');
  const stocks = ref([])
  const balance = ref(0);
  const news = ref([]);
  const token = '64f071177c48764f071177c48a';
  const baseUrl = 'https://datsorange.devteam.games'
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

      await $fetch(baseUrl + '/news/LatestNews', {
          headers: {
              'token': token,
          }
      }).then((res) => {
          news.value = res;
      })
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
          if (res.message === 'Ok') {
              fetchBalance();
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


</script>