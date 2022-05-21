<svelte:options accessors={true} />

<script>
  // TODO https://svelte.dev/repl/23ce5697b1ef41d6bed1ad7b68f49070?version=3.48.0
  // https://habr.com/ru/post/486626/

  import deepmerge from 'deepmerge';
  import {
    Text,
    Textarea,
    Numeric,
    DateInput,
    Checkbox,
    Select
  } from './fields/index.js';
  import Applications from './blocks/applications.svelte';

  let certScore;
  let extraScore;
  let totalScore;
  let tags;

  export let eduProgs = [];

  export let close = () => {};

  export let data = {
    type: 'abit',
    regDate: '2.3.21',
    fio: 'Ниязова Марина Романовна',
    gender: 'ж',
    baseEduLevel: null,
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
      },
      {
        eduProg: 'БУзк',
        grade: '4',
        priority: true,
        disabled: false
      }
    ],
    apps: {
      baseEduLevel: null
    },
    birthDate: null,
    isFullAge: false,
    passport: {
      serialNumber: null,
      issuedBy: null,
      issuedAt: null,
      addressReg: null,
      addressActual: null
    },
    counterpart: {
      fio: null,
      tel: null,
      passport: {
        serialNumber: null,
        issuedBy: null,
        issuedAt: null,
        addressReg: null,
        addressActual: null
      }
    }
  };

  const defaultData = {
    type: 'abit',
    regDate: null,
    fio: null,
    gender: null,
    baseEduLevel: null,
    certScore: null,
    extraScore: null,
    hasEduCertOriginal: null,
    hasMedicalCert: null,
    hasFluoro: null,
    hasVaccine: null,
    address: null,
    tel: null,
    needDorm: null,
    schoolYear: null,
    school: null,
    memo: null,
    applications: [],
    apps: {
      baseEduLevel: null
    },
    birthDate: null,
    isFullAge: null,
    passport: {
      serialNumber: null,
      issuedBy: null,
      issuedAt: null,
      addressReg: null,
      addressActual: null
    },
    counterpart: {
      fio: null,
      tel: null,
      passport: {
        serialNumber: null,
        issuedBy: null,
        issuedAt: null,
        addressReg: null,
        addressActual: null
      }
    }
  };

  const setDataValue = (v) => {
    return deepmerge(defaultData, v);
  };

  $: {
    data = setDataValue(data);
  }

  $: {
    tags = Array.from(
      // [\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}] // https://learn.javascript.ru/regexp-character-sets-and-ranges
      data?.memo.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g) || [],
      (tag) => tag[1]
    );
  }

  const setScoreValues = (certScore, extraScore) => {
    data.certScore = parseNumber(certScore);
    data.extraScore = parseNumber(extraScore);
  };

  $: {
    setScoreValues(data.certScore, data.extraScore);
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
  <div class="field-container">
    <DateInput title={'Дата регистрации'} bind:value={data.regDate} required />

    <Text title={'Фамилия Имя Отчество'} bind:value={data.fio} size={50} />
    <Select
      title="Пол"
      bind:value={data.gender}
      options={[
        ['м', 'мужской'],
        ['ж', 'женский']
      ]}
    />
  </div>
  <div class="field-container">
    <Select
      title="Базовое образование"
      bind:value={data.baseEduLevel}
      hasEmptyOption={true}
      options={[
        ['9 классов', '9 классов'],
        ['11 классов', '11 классов']
      ]}
    />
    <Numeric
      title={'Средний балл аттестата'}
      bind:value={data.certScore}
      min={0}
      max={5}
      step={0.01}
      size={10}
    />
    <Numeric
      title={'Дополнительные баллы'}
      bind:value={data.extraScore}
      min={0}
      step={0.1}
      size={10}
    />
    <Numeric
      title={'Итоговый конкурсный балл'}
      bind:value={data.totalScore}
      size={10}
      readonly={true}
    />
  </div>
  <div class="field-container">
    <Checkbox
      title="Подлинник аттестата"
      bind:value={data.hasEduCertOriginal}
    />
    <Checkbox title="Медицинская справка" bind:value={data.hasMedicalCert} />
    <Checkbox title="Флюорография" bind:value={data.hasFluoro} />
    <Checkbox title="Прививки" bind:value={data.hasVaccine} />
  </div>
  <div class="field-container">
    <Select
      title="Общежитие"
      bind:value={data.needDorm}
      options={[
        [0, 'не требуется'],
        [1, 'требуется'],
        [2, 'приоритетное']
      ]}
    />
    <Text title={'Адрес'} bind:value={data.address} size={50} />
    <Text title={'Телефон'} bind:value={data.tel} size={15} />
  </div>
  <div class="field-container">
    <Text title={'Школа'} bind:value={data.school} size={70} />
    <Text
      title={'Год окончания школы'}
      bind:value={data.schoolYear}
      size={10}
    />
  </div>
  <div class="field-container">
    <Textarea title={'Примечание'} bind:value={data.memo} size={97} />
  </div>

  <div class="field-container">
    <Applications bind:applications={data.applications} {eduProgs} />
  </div>
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
  #debug {
    display: none;
  }
  #debug:target {
    display: block;
    font-size: xx-small;
  }
</style>
