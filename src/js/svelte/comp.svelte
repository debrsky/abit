<svelte:options accessors={true} />

<script>
  import Text from './fields/text.svelte';
  import Numeric from './fields/numeric.svelte';
  import DateInput from './fields/date.svelte';
  import Textarea from './fields/textarea.svelte';
  import Select from './fields/select.svelte';
  import Checkbox from './fields/checkbox.svelte';

  let certScore;
  let extraScore;
  let totalScore;
  let tags;

  export let close = () => {};

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
      data?.memo.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g) || [],
      (tag) => tag[1]
    );
  }

  $: {
    certScore = parseNumber(data.certScore);
    extraScore = parseNumber(data.extraScore);

    data.totalScore = parseFloat(
      (
        (Number.isFinite(certScore) ? certScore : 0) +
        (Number.isFinite(extraScore) ? extraScore : 0)
      ).toFixed(6)
    );

    totalScore = Number.isFinite(data.totalScore)
      ? data.totalScore.toString().replace('.', ',')
      : 0;
  }

  function parseNumber(n) {
    if (Number.isFinite(n)) return n;

    let r;
    try {
      r = parseFloat(n.toString().replace(',', '.'));
    } catch (err) {
      return n;
    }
    if (Number.isFinite(r)) return r;

    return n;
  }
</script>

<form on:submit|preventDefault={() => close({ok: true})}>
  <DateInput title={'Дата регистрации'} bind:value={data.regDate} required />

  <Text title={'ФИО'} bind:value={data.fio} size={50} />
  <Select
    title="Пол"
    bind:value={data.gender}
    options={{м: 'мужской', ж: 'женский'}}
  />
  <Numeric
    title={'Средний балл аттестата'}
    bind:value={data.certScore}
    size={5}
  />
  <Numeric
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

  <button class="button button--primary" type="submit"
    >✔️ Сохранить и закрыть</button
  >
  <button
    class="button button--secondary"
    type="button"
    on:click={() => {
      close({ok: true, cmd: 'duplicate'});
    }}>📑 Дублировать</button
  >
  <button
    class="button button--secondary"
    type="button"
    on:click={() => {
      close({ok: false});
    }}>❌ Закрыть без сохранения</button
  >
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
    font-size: xx-small;
  }
</style>
