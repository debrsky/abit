<svelte:options accessors={true} />

<script>
  import Text from './fields/text.svelte';
  import Decimal from './fields/decimal.svelte';
  import DateInput from './fields/date.svelte';
  import TextMasked from './fields/text-masked.svelte';
  import Textarea from './fields/textarea.svelte';
  import Select from './fields/select.svelte';
  import Checkbox from './fields/checkbox.svelte';

  let totalScore;
  let tags;

  let name = 'Svelte';

  export let data = {
    type: 'abit',
    regDate: '2.3.21',
    fio: 'Ниязова Марина Романовна',
    gender: 'ж',
    certScore: '4,81',
    extraScore: 0.1,
    hasEduCertOriginal: true,
    hasMedicalCert: true,
    hasFluoro: true,
    hasVaccine: true,
    address: 'ПК г. Большой-Камень',
    tel: '+79841528598',
    needDorm: '1',
    schoolYear: '2021',
    school: 'МБОУ СОШ № 44 г. Б-Камень',
    memo: '',
    applications: [
      {
        eduProg: 'БУ',
        grade: '4',
        priority: true,
        disabled: false
      }
    ],
    _id: '86d77d0c-ea1d-47ca-95a4-ba9f828b424a'
  };

  $: {
    tags = Array.from(
      // [\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}] // https://learn.javascript.ru/regexp-character-sets-and-ranges
      data.memo.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g),
      (tag) => tag[1]
    );

    data.totalScore =
      Number.isFinite(data.certScore) && Number.isFinite(data.extraScore)
        ? parseFloat((data.certScore + data.extraScore).toFixed(5))
        : undefined;

    totalScore = String(data.totalScore).replace('.', ',');
  }
</script>

<form on:submit|preventDefault>
  <DateInput title={'Дата регистрации'} bind:value={data.regDate} required />

  <Text title={'ФИО'} bind:value={data.fio} size={50} />
  <Select
    title="Пол"
    bind:value={data.gender}
    options={{м: 'мужской', ж: 'женский'}}
  />
  <Decimal
    title={'Средний балл аттестата'}
    bind:value={data.certScore}
    size={5}
  />
  <Decimal
    title={'Дополнительные баллы'}
    bind:value={data.extraScore}
    size={5}
  />
  <Text
    title={'Итоговый конкурсный балл'}
    bind:value={totalScore}
    size={5}
    readonly={true}
  />
  <div class="checkbox-container">
    <Checkbox
      title="Подлинник аттестата"
      bind:value={data.hasEduCertOriginal}
    />
    <Checkbox title="Медицинская справка" bind:value={data.hasMedicalCert} />
    <Checkbox title="Флюорография" bind:value={data.hasFluoro} />
    <Checkbox title="Прививки" bind:value={data.hasVaccine} />
  </div>
  <Select
    title="Общежитие"
    bind:value={data.needDorm}
    options={{'0': 'не требуется', '1': 'требуется', '2': 'приоритетное'}}
  />
  <Text title={'Адрес'} bind:value={data.address} size={50} />
  <Text title={'Школа'} bind:value={data.school} size={50} />
  <Text title={'Год окончания школы'} bind:value={data.schoolYear} size={5} />
  <Text title={'Телефон'} bind:value={data.tel} size={50} />
  <Textarea title={'Примечание'} bind:value={data.memo} size={50} />
  <pre>{tags.join(', ')}</pre>

  <input type="submit" value="Ок" />
  <input type="reset" value="Отмена" />
</form>
<pre id="debug">{JSON.stringify(data, null, 4)}</pre>

<style>
  .checkbox-container {
    display: flex;
  }
  #debug {
    display: none;
  }
  #debug:target {
    display: block;
  }
</style>
