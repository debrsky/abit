<script>
  export let spec = {
    name: '38.02.01 Экономика и бухгалтерский учет',
    fullTime: {
      level9: {
        duration: '2 года 10 месяцев',
        free: 25,
        paid: 50
      },
      level11: {
        duration: '1 год 10 месяцев',
        freePlaces: 25,
        paidPlaces: 50
      }
    },
    absentia: {
      level11: {
        duration: '2 года 10 месяцев',
        freePlaces: 25,
        paidPlaces: 50
      }
    }
  };
</script>

<article>
  <div class="name" contenteditable="true" bind:textContent={spec.name} />
  <div class="full-time">очная</div>
  <div class="absentia">заочная</div>
  <div class="full-time-9">9 классов</div>
  <div class="full-time-11">11 классов</div>
  <div class="absentia-11">11 классов</div>
  <div class="duration-full-time-9">
    <input type="text" bind:value={spec.fullTime.level9.duration} size="13" />
  </div>
  <div class="duration-full-time-11">
    <input type="text" bind:value={spec.fullTime.level11.duration} size="13" />
  </div>
  <div class="duration-absentia-11">
    <input type="text" bind:value={spec.absentia.level11.duration} size="13" />
  </div>
  <div class="full-time-9-free">
    <input type="text" bind:value={spec.fullTime.level9.freePlaces} size="5" />
  </div>
  <div class="full-time-11-free">
    <input type="text" bind:value={spec.fullTime.level11.freePlaces} size="5" />
  </div>
  <div class="absentia-11-free">
    <input type="text" bind:value={spec.absentia.level11.freePlaces} size="5" />
  </div>
  <div class="full-time-9-paid">
    <input type="text" bind:value={spec.fullTime.level9.paidPlaces} size="5" />
  </div>
  <div class="full-time-11-paid">
    <input type="text" bind:value={spec.fullTime.level11.paidPlaces} size="5" />
  </div>
  <div class="absentia-11-paid">
    <input type="text" bind:value={spec.absentia.level11.paidPlaces} size="5" />
  </div>
</article>

<style>
  article {
    display: grid;
    gap: 0.5em;
    grid-template-columns: max-content 10ch 10ch 15ch 10ch 10ch;
    grid-template-areas:
      'name full-time full-time-11 duration-full-time-11 full-time-11-free full-time-11-paid'
      'name full-time full-time-9  duration-full-time-9  full-time-9-free  full-time-9-paid'
      'name absentia  absentia-11  duration-absentia-11  absentia-11-free  absentia-11-paid';
  }
  .name {
    grid-area: name;
  }
  .full-time {
    grid-area: full-time;
  }
  .absentia {
    grid-area: absentia;
  }
  .full-time-11 {
    grid-area: full-time-11;
  }
  .full-time-9 {
    grid-area: full-time-9;
  }
  .absentia-11 {
    grid-area: absentia-11;
  }
  .duration-full-time-11 {
    grid-area: duration-full-time-11;
  }
  .duration-full-time-9 {
    grid-area: duration-full-time-9;
  }
  .duration-absentia-11 {
    grid-area: duration-absentia-11;
  }
  .full-time-11-free {
    grid-area: full-time-11-free;
  }
  .full-time-9-free {
    grid-area: full-time-9-free;
  }
  .absentia-11-free {
    grid-area: absentia-11-free;
  }
  .full-time-11-paid {
    grid-area: full-time-11-paid;
  }
  .full-time-9-paid {
    grid-area: full-time-9-paid;
  }
  .absentia-11-paid {
    grid-area: absentia-11-paid;
  }
</style>
