<script>
  export let speciality = {
    name: '38.02.01 Экономика и бухгалтерский учет',
    code: 'БУ',
    qualification: 'бухгалтер',
    fullTime: {
      level9: {
        duration: '2 года 10 месяцев',
        freePlaces: 25,
        paidPlaces: 50
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

  const specialities = [];
  specialities.push(JSON.parse(JSON.stringify(speciality)));
  specialities.push(JSON.parse(JSON.stringify(speciality)));
  specialities.push(JSON.parse(JSON.stringify(speciality)));
  specialities.push(JSON.parse(JSON.stringify(speciality)));
  specialities.push(JSON.parse(JSON.stringify(speciality)));
</script>

<article>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th class="col-spec">Специальность</th>
        <th class="col-edu-form">Форма обучения</th>
        <th class="col-base-edu-level">Базовое образование</th>
        <th class="col-duration">Продолжительность обучения</th>
        <th class="col-free-places">Бесплатно, кол-во мест</th>
        <th class="col-paid-places">Платно, кол-во мест</th>
      </tr>
    </thead>
    <tbody>
      {#each specialities as spec}
        <tr>
          <td class="counter last" rowspan="3" />
          <td class="last" rowspan="3">
            <div style="display: flex; flex-direction: column; width: 100%;">
              <label style="display: flex; flex-wrap: wrap; width: 100%;">
                <span>Наименование</span>
                <textarea bind:value={spec.name} style="width: 100%" />
                <!-- <input type="text" bind:value={spec.name} style="width: 100%;" /> -->
              </label>
              <div style="display: flex; gap: 1ch; text-align: start;">
                <label>
                  <span>Код</span>
                  <input
                    type="text"
                    bind:value={spec.code}
                    style="width: 10ch;"
                  />
                </label>
                <label
                  style="flex-grow: 1; display: flex; flex-direction: column;"
                >
                  <span>Квалификация</span>
                  <textarea
                    bind:value={spec.qualification}
                    style="width: 100%"
                  />
                  <!-- <input
                  type="text"
                  bind:value={spec.qualification}
                  style="width: 100%;"
                /> -->
                </label>
              </div>
            </div>
          </td>
          <td rowspan="2">очная</td>
          <td>9 классов</td>
          <td>{spec.fullTime.level9.duration}</td>
          <td>{spec.fullTime.level9.freePlaces}</td>
          <td>{spec.fullTime.level9.paidPlaces}</td>
        </tr>
        <tr>
          <td>11 классов</td>
          <td>{spec.fullTime.level11.duration}</td>
          <td>{spec.fullTime.level11.freePlaces}</td>
          <td>{spec.fullTime.level11.paidPlaces}</td>
        </tr>
        <tr>
          <td class="last">заочная</td>
          <td class="last">11 классов</td>
          <td class="last">{spec.absentia.level11.duration}</td>
          <td class="last">
            <input
              type="text"
              size="5"
              bind:value={spec.absentia.level11.freePlaces}
            />
          </td>
          <td
            class="last"
            contenteditable="true"
            bind:textContent={spec.absentia.level11.paidPlaces}
          />
        </tr>
      {/each}
    </tbody>
  </table>
</article>

<style>
  tbody {
    counter-reset: n;
  }
  tbody .counter::before {
    counter-increment: n;
    content: counter(n);
  }

  td.last {
    border-bottom: 1px solid black;
  }

  textarea {
    font-family: inherit;
  }

  article,
  table {
    width: 100%;
  }

  label {
    padding: 0.25em 0;
    width: min-content;
  }

  label span {
    font-size: x-small;
    margin-right: 0.5ch;
  }

  table {
    border-collapse: collapse;
  }
  table td,
  table th {
    font-weight: normal;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 0.25em;
    text-align: center;
  }

  table th {
    font-size: normal;
    background-color: lightgrey;
  }

  .col-paid-places,
  .col-free-places {
    width: 10ch;
  }

  .col-duration {
    width: 20ch;
  }
  .col-base-edu-level {
    width: 10ch;
  }
  .col-edu-form {
    width: 10ch;
  }
</style>
