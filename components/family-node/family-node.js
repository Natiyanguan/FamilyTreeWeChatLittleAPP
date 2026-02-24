Component({
  properties: {
    node: Object
  },
  
  methods: {
    handleCoupleTap(e) {
      const husbandId = e.currentTarget.dataset.husbandId;
      this.triggerEvent('toggle', { id: husbandId, type: 'member' });
    },
    
    toggle(e) {
      this.triggerEvent('toggle', e.detail);
    }
  }
})