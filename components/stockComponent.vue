<template>
  <div class="border rounded bg-gray-100 p-4">
      {{ stock.id }} <span class="font-bold">{{ stock.ticker }}</span>
      <ul class="mt-4" v-for="bid in stock.bids">
          <li>
              <div class="flex gap-4 mb-2">
                  <p>price: <span class="font-semibold">${{ bid.price }}</span></p>
                <p>quantity: <span class="font-semibold">{{ bid.quantity }}</span></p>
              </div>

          </li>

      </ul>
      <div class="flex items-center gap-4">
          <input type="number" v-model="quantity">
          <button class="px-4 py-2 bg-gray-200" @click="action(stock.id, quantity)">{{ actionTitle }}</button>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
    stock: {
        type: Object,
        required: true,
    },
    action: {
        type: Function,
    },
    actionTitle: {
        type: String,
    }
});
const {stock, action, actionTitle} = props;

const quantity = ref(0)
</script>

<style scoped>

</style>