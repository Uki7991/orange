export const useStocks = defineStore('stocks', {
    state: () => ({
        current: null,
    }),
    actions: {
        setCurrent(stock) {
            this.current = stock;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStocks, import.meta.hot))
}