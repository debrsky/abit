<script>
  import {
    Text,
    Textarea,
    Numeric,
    DateInput,
    Checkbox,
    Select
  } from './fields/index.js';
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
          <Numeric title="Наименование" />
        </div>
      </td>
    </tr>
    <tr>
      <td>DateInput</td>
      <td>
        <div class="fcontainer">
          <DateInput title="Наименование" />
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
            options={{
              '0': 'не требуется',
              '1': 'требуется',
              '2': 'приоритетное'
            }}
          />
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
