<svelte:options accessors={true} />

<script>
  import {Numeric} from '../fields/index.js';

  export let save = () => {};
  export let doc = {type: 'spec', specialities: []};

  let defaultSpeciality = {
    name: '',
    code: '',
    qualification: '',
    fullTime: {
      level9: {
        duration: null,
        freePlaces: null,
        paidPlaces: null
      },
      level11: {
        duration: null,
        freePlaces: null,
        paidPlaces: null
      }
    },
    absentia: {
      level11: {
        duration: null,
        freePlaces: null,
        paidPlaces: null
      }
    }
  };

  const addNewSpec = () => {
    const spec = JSON.parse(JSON.stringify(defaultSpeciality));
    doc.specialities = [...doc.specialities, spec];
  };
  const removeSpec = (specIdx) => {
    doc.specialities = [
      ...doc.specialities.filter((spec, idx) => idx !== specIdx)
    ];
  };
  const getSubTotals = (spec) => {
    let freePlaces =
      (spec?.fullTime?.level9?.freePlaces || 0) +
      (spec?.fullTime?.level11?.freePlaces || 0) +
      (spec?.absentia?.level11?.freePlaces || 0);

    let paidPlaces =
      (spec?.fullTime?.level9?.paidPlaces || 0) +
      (spec?.fullTime?.level11?.paidPlaces || 0) +
      (spec?.absentia?.level11?.paidPlaces || 0);

    freePlaces = Number.isFinite(freePlaces) ? freePlaces : 0;
    paidPlaces = Number.isFinite(paidPlaces) ? paidPlaces : 0;

    return {freePlaces, paidPlaces};
  };

  const getEduProgs = (spec) => {
    const eduProgs = [];
    if (spec?.fullTime?.level9?.freePlaces) eduProgs.push(`${spec.code}9`);
    if (spec?.fullTime?.level9?.paidPlaces) eduProgs.push(`${spec.code}9к`);
    if (spec?.fullTime?.level11?.freePlaces) eduProgs.push(`${spec.code}`);
    if (spec?.fullTime?.level11?.paidPlaces) eduProgs.push(`${spec.code}к`);
    if (spec?.absentia?.level11?.freePlaces) eduProgs.push(`${spec.code}з`);
    if (spec?.absentia?.level11?.paidPlaces) eduProgs.push(`${spec.code}зк`);
    return eduProgs;
  };

  const specExport = () => {
    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(doc.specialities, null, 4)], {
      type: 'application/json'
    });
    a.download = 'specialities.json';
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  };

  const specImport = (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      doc.specialities = JSON.parse(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    reader.onloadend = function () {
      e.target.value = null;
    };

    reader.readAsText(file);
  };
</script>

<article data-id={doc._id} data-rev={doc._rev}>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th class="col-spec">Специальность</th>
        <th class="col-edu-form">Форма обучения</th>
        <th class="col-base-edu-level">Базовое образование</th>
        <th class="col-duration">Срок обучения, лет</th>
        <th class="col-free-places">Бесплатно, кол-во мест</th>
        <th class="col-paid-places">Платно, кол-во мест</th>
      </tr>
    </thead>
    <tbody>
      {#each doc.specialities as spec, idx}
        <tr>
          <td class="last" style="position: relative;" rowspan="3">
            <div
              style="display: flex; flex-direction: column; align-items: center;"
            >
              <div class="counter" />
              <button
                type="button"
                on:click={() => {
                  removeSpec(idx);
                }}
                style="width: 3ch;"
                >X
              </button>
            </div>
          </td>
          <td class="last" rowspan="3">
            <div style="display: flex; flex-direction: column; width: 100%;">
              <label style="display: flex; flex-wrap: wrap; width: 100%;">
                <span>Наименование</span>
                <!-- <textarea bind:value={spec.name} style="width: 100%" /> -->
                <input
                  type="text"
                  bind:value={spec.name}
                  style="width: 100%;"
                />
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
                  <!-- <textarea
                    bind:value={spec.qualification}
                    style="width: 100%"
                  /> -->
                  <input
                    type="text"
                    bind:value={spec.qualification}
                    style="width: 100%;"
                  />
                </label>
              </div>
              <!-- <div>{getEduProgs(spec).join(', ')}</div> -->
            </div>
          </td>
          <td rowspan="2">очная</td>
          <td>9 классов</td>
          <td>
            <Numeric bind:value={spec.fullTime.level9.duration} size={5} />
          </td>
          <td>
            <Numeric
              bind:value={spec.fullTime.level9.freePlaces}
              title={null}
              size={5}
            />
          </td>
          <td>
            <Numeric
              bind:value={spec.fullTime.level9.paidPlaces}
              title={null}
              size={5}
            />
          </td>
        </tr>
        <tr>
          <td>11 классов</td>
          <td>
            <Numeric bind:value={spec.fullTime.level11.duration} size={5} />
          </td>
          <td>
            <Numeric bind:value={spec.fullTime.level11.freePlaces} size={5} />
          </td>
          <td>
            <Numeric bind:value={spec.fullTime.level11.paidPlaces} size={5} />
          </td>
        </tr>
        <tr>
          <td class="last">заочная</td>
          <td class="last">11 классов</td>
          <td class="last">
            <Numeric bind:value={spec.absentia.level11.duration} size={5} />
          </td>
          <td class="last">
            <Numeric bind:value={spec.absentia.level11.freePlaces} size={5} />
          </td>
          <td class="last">
            <Numeric bind:value={spec.absentia.level11.paidPlaces} size={5} />
          </td>
        </tr>
      {/each}
    </tbody>
    <thead>
      <tr>
        <th colspan="5" style="text-align: end;">ИТОГО</th>
        <th>
          {doc.specialities.reduce(
            (acc, cur) => acc + getSubTotals(cur).freePlaces,
            0
          )}
        </th>
        <th>
          {doc.specialities.reduce(
            (acc, cur) => acc + getSubTotals(cur).paidPlaces,
            0
          )}
        </th>
      </tr>
    </thead>
  </table>
  <div style="margin-top: 1em;">
    <button type="button" on:click={() => addNewSpec()}>
      Добавить специальность
    </button>
  </div>
  <div style="margin-top: 1em;">
    <button type="button" on:click={() => save(doc)}>Сохранить</button>
    <button type="button" on:click={() => specExport(doc)}>Экспорт</button>
    <div style="margin-top: 1em;">
      <span>Импорт</span>
      <input
        type="file"
        accept="application/json"
        on:change={(e) => specImport(e)}
      />
    </div>
  </div>
</article>

<style>
  tbody {
    counter-reset: n;
  }
  tbody .counter::before {
    counter-increment: n;
    content: counter(n);
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.25em;
  }

  td.last {
    border-bottom: 1px solid black;
  }

  input {
    font-family: inherit;
    font-size: inherit;
  }

  article,
  table {
    width: 100%;
  }

  label {
    padding: 0.1em 0;
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
    padding: 0.1em 0.25em;
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
    width: 10ch;
  }
  .col-base-edu-level {
    width: 10ch;
  }
  .col-edu-form {
    width: 10ch;
  }
</style>
