<script>
  import {
    Text,
    Textarea,
    Numeric,
    DateInput,
    Checkbox,
    Select
  } from './fields/index.js';

  let numericValue;
  let dateValue;
  let selectValue;
</script>

<table>
  <tbody>
    <tr>
      <td>Text</td>
      <td>
        <div class="fcontainer">
          <Text title="Наименование" />
        </div>
      </td>
    </tr>
    <tr>
      <td>Textarea</td>
      <td>
        <div class="fcontainer">
          <Textarea title="Наименование" />
        </div>
      </td>
    </tr>
    <tr>
      <td>Numeric</td>
      <td>
        <div class="fcontainer">
          <Numeric title="Наименование" bind:value={numericValue} />
          <div style="display: flex; gap: 1ch;">
            <span>{JSON.stringify(numericValue)}</span>
            <span>{typeof numericValue}</span>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>DateInput</td>
      <td>
        <div class="fcontainer">
          <DateInput title="Наименование" bind:value={dateValue} />
          <div style="display: flex; gap: 1ch;">
            <span>{JSON.stringify(dateValue)}</span>
            <span>{typeof dateValue}</span>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>Checkbox</td>
      <td>
        <div class="fcontainer">
          <Checkbox title="наименование" />
        </div>
      </td>
    </tr>
    <tr>
      <td>Select</td>
      <td>
        <div class="fcontainer">
          <Select
            title="Общежитие"
            hasEmptyOption={true}
            options={[
              [0, 'не требуется'],
              [1, 'требуется'],
              [2, 'приоритетное']
            ]}
            bind:value={selectValue}
          />
          <div style="display: flex; gap: 1ch;">
            <span>{JSON.stringify(selectValue)}</span>
            <span>{typeof selectValue}</span>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  table td {
    border: 1px solid lightgrey;
    height: 5em;
  }

  table td:nth-child(2) {
    vertical-align: middle;
    text-align: center;
  }

  .fcontainer {
    display: flex;
    place-content: center;
    place-items: center;

    width: 100%;
    height: 100%;
  }
</style>
