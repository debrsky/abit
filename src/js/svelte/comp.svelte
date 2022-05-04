<script>
	import Text from "./fields/text.svelte";
	import TextMasked from "./fields/text-masked.svelte";
	import Textarea from "./fields/textarea.svelte";
	import Select from "./fields/select.svelte";
	import Checkbox from "./fields/checkbox.svelte";

	let value = 1;

	let name = 'Svelte';

	export let regDate;
	export let fio;
	export let gender;
	export let certScore;
  export let extraScore;
  export let totalScore;
	export let hasEduCertOriginal;
	export let hasMedicalCert;
	export let hasFluoro;
	export let hasVaccine;
  export let needDorm;
  export let school;
  export let schoolYear;
  export let address;
  export let tel;
  export let memo;
	export let paidEduReady;

	$: totalScore = certScore + extraScore;

</script>
<pre>{regDate}</pre>
<form>
	<TextMasked title={"Дата регистрации"} bind:value={regDate} unmask="untyped" imask={{ mask: Date }}/>
	<Text title={"ФИО"} bind:value={fio} size={50}/>
	<Select title="Пол" bind:value={gender} size={50} options={{"м": "мужской", "ж": "женский"}}/>
	<TextMasked title={"Средний балл аттестата"} bind:value={certScore} size={5} unmask="typed" imask={{ mask: Number, scale: 2, radix: ',', mapToRadix: ['.'] }}/>
	<TextMasked title={"Дополнительные баллы"} bind:value={extraScore} size={5}  unmask="typed" imask={{ mask: Number, scale: 2, radix: ',', mapToRadix: ['.'] }}/>
	<TextMasked title={"Итоговый конкурсный балл"} bind:value={totalScore} size={5} readonly={true} unmask="typed" imask={{ mask: Number, scale: 2,  radix: ',', mapToRadix: ['.'] }}/>
	<Checkbox title="Подлинник аттестата" bind:value={hasEduCertOriginal}/>
	<Checkbox title="Медицинская справка" bind:value={hasMedicalCert}/>
	<Checkbox title="Флюорография" bind:value={hasFluoro}/>
	<Checkbox title="Прививки" bind:value={hasVaccine}/>
	<Select title="Общежитие" bind:value={needDorm} options={{"0": "не требуется", "1": "требуется", "2":"приоритетное"}}/>
	<Text title={"Адрес"} bind:value={address} size={50}/>
	<Text title={"Школа"} bind:value={school} size={50}/>
	<Text title={"Год окончания школы"} bind:value={schoolYear} size={5}/>
	<Text title={"Телефон"} bind:value={tel} size={50}/>
	<Textarea title={"Примечание"} bind:value={memo} size={50}/>
	<Checkbox title="Рассматривает платное обучение" bind:value={paidEduReady}/>
</form>
<pre>{JSON.stringify({regDate,
fio,
gender,
certScore,
extraScore,
totalScore,
hasEduCertOriginal,
hasMedicalCert,
hasFluoro,
hasVaccine,
needDorm,
school,
schoolYear,
address,
tel,
memo,
paidEduReady}, null, 4)}</pre>
