<svelte:options accessors={true} />

<script>
  import deepmerge from 'deepmerge';
  import {Select, Numeric, Checkbox} from './fields/index.js';

  const L_9 = '9 классов';
  const L_11 = '11 классов';
  const FULL_TIME = 'очная';
  const ABSENTIA = 'заочная';
  const FREE = 'бюджет';
  const PAID = 'внебюджет';

  const defaultApplication = {
    eduProg: null,
    grade: null,
    prioriry: null,
    disabled: false
  };

  export let applications = [
    {
      eduProg: 'ЗИО',
      grade: 5,
      priority: false,
      disabled: false
    },
    {
      eduProg: 'СЭЗИС',
      grade: 5,
      priority: null,
      disabled: false
    }
  ];
  export let eduProgs = [];
  let matrix = [];

  let finSource = null;
  let baseEduLevel = null;
  let eduForm = null;
  let spec = null;

  let baseEduLevelSet;
  let eduFormSet;
  let specSet;
  let finSourceSet;

  $: {
    matrix = Array.from(
      new Set(eduProgs.map((eduProg) => eduProg.specCode))
    ).map((specCode) => {
      const row = [
        [FULL_TIME, L_11, FREE],
        [FULL_TIME, L_9, FREE],
        [ABSENTIA, L_11, FREE],
        [FULL_TIME, L_11, PAID],
        [FULL_TIME, L_9, PAID],
        [ABSENTIA, L_11, PAID]
      ].map(([eduForm, baseEduLelel, finSource]) =>
        findEduProg(specCode, eduForm, baseEduLelel, finSource)
      );

      return row;
    });

    finSourceSet = new Set(eduProgs.map((eduProg) => eduProg.finSource));
    baseEduLevelSet = new Set(eduProgs.map((eduProg) => eduProg.baseEduLevel));
    eduFormSet = new Set(eduProgs.map((eduProg) => eduProg.eduForm));

    specSet = new Set(
      eduProgs
        .filter(
          (eduProg) =>
            eduProg.baseEduLevel === baseEduLevel &&
            (!eduForm || eduProg.eduForm === eduForm) &&
            (!finSource || eduProg.finSource === finSource) &&
            !applications.some(
              (application) => application.eduProg === eduProg.code
            )
        )
        .map((eduProg) => eduProg.code)
    );
  }

  $: {
    if (applications.length > 0 && !applications.some((app) => app.priority)) {
      applications[0].priority = true;

      applications = applications; // trigger rendering
    }
  }

  function addApplication(application) {
    const app = deepmerge(defaultApplication, application);
    applications = [app, ...applications].sort((a, b) => {
      if (a.eduProg < b.eduProg) return -1;
      if (a.eduProg > b.eduProg) return 1;
      return 0;
    });
  }

  function removeApplication(application) {
    applications = applications.filter(
      (app) => application.eduProg !== app.eduProg
    );
  }

  function findEduProg(specCode, eduForm, baseEduLevel, finSource) {
    return eduProgs.find(
      (eduProg) =>
        eduProg.specCode === specCode &&
        eduProg.eduForm === eduForm &&
        eduProg.baseEduLevel === baseEduLevel &&
        eduProg.finSource === finSource
    );
  }
</script>

<article>
  <section>
    <table class="edu-progs">
      <thead>
        <tr>
          <th colspan="3"> бюджет </th>
          <th colspan="3"> внебюджет </th>
        </tr>
      </thead>
      <tbody>
        {#each matrix as row, idx}
          <tr>
            {#each row as eduProg}
              <td>
                <div class="cell">
                  {#if eduProg}
                    <button
                      class="badge edu-prog-button"
                      type="button"
                      on:click={() => addApplication({eduProg: eduProg.code})}
                      disabled={applications.some(
                        (app) => app.eduProg === eduProg.code
                      )}
                    >
                      {eduProg.code}
                    </button>
                  {/if}
                </div>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section style="order: -1;">
    <table class="applications">
      <thead>
        <tr>
          <th />
          <th>Образовательная<br />программа</th>
          <th>Оценка по<br />профильному<br />предмету</th>
          <th>Приоритет</th>
          <th>Спрятать?</th>
        </tr>
      </thead>
      <tbody>
        {#each applications as application, idx (application.eduProg)}
          <tr>
            <td>
              <div class="cell">
                <button
                  class="button button--remove"
                  type="button"
                  on:click={() => removeApplication(application)}
                />
              </div>
            </td>
            <td>
              <div class="cell">
                {application.eduProg}
              </div>
            </td>
            <td>
              <div class="cell">
                <Numeric
                  bind:value={application.grade}
                  size={5}
                  min={0}
                  max={5}
                />
              </div>
            </td>
            <td>
              <div class="cell">
                <Checkbox
                  bind:value={application.priority}
                  change={(checked) => {
                    if (checked) {
                      applications.forEach((app, i) => {
                        if (i !== idx) app.priority = false;
                      });

                      applications = applications; // trigger rendering
                      return;
                    }

                    if (!applications.some((app) => app.priority)) {
                      applications[0].priority = true;

                      applications = applications; // trigger rendering
                    }
                  }}
                />
              </div>
            </td>
            <td>
              <div class="cell">
                <Checkbox bind:value={application.disabled} />
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</article>

<style>
  article {
    border: 1px solid black;
    width: fit-content;
    padding: 0.25em;
    display: flex;
    gap: 1ch;
  }

  table.edu-progs th {
    font-size: x-small;
  }

  .edu-prog-button {
    cursor: pointer;
  }

  .edu-prog-button:active {
    transform: scale(0.9);
  }

  table.applications {
    border-collapse: collapse;
  }

  table.applications th {
    font-size: x-small;
    padding: 0 0.5ch;
  }

  table.applications th:first-child {
    width: 6ch;
  }

  .cell {
    display: flex;
    place-content: center;
    place-items: center;
  }

  table.applications td,
  table.applications th {
    border-top: 1px solid darkgrey;
    border-bottom: 1px solid darkgrey;
  }

  table th {
    background-color: lightgrey;
  }
</style>
