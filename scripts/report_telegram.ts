import { parse } from 'https://deno.land/std/flags/mod.ts';

function reportTelegram() {
  const { steps } = parse(Deno.args);
  console.log('Tentativa de acessar campo DIRETAMENTE', steps?.setup_deno);
  console.log('Antes do stringify', steps);
  console.log('Tentativa de acessar campo', steps?.setup_deno);
  const jsonString2 = JSON.stringify(steps);
  console.log('Antes do parse', jsonString2);
  const jsonObject2 = JSON.parse(jsonString2);
  console.log('Depois do parse', jsonObject2);
  console.log('Tentativa de acessar campo', jsonObject2?.setup_deno);
  console.log('Tipo depois do parse', typeof jsonObject2);
  // console.log(JSON.parse(steps));
  // const name = Deno.env.get('GITHUB_JOB');
  // console.log(name);
}

reportTelegram();
