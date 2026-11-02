const {open}=require('./admin.cjs');const fs=require('fs');
(async()=>{const {browser,page}=await open();await page.goto('https://matchlearn.cat/wp-admin/post.php?post=1859&action=edit',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!window.wpApiSettings?.nonce);
const result=await page.evaluate(async()=>{
const headers={'X-WP-Nonce':wpApiSettings.nonce,'Content-Type':'application/json'};
const seo=await fetch('/wp-json/surerank/v1/post/seo-settings?post_id=1859&post_type=page',{headers}).then(r=>r.json());
const data={message_description:'Fem servir galetes per al funcionament del web i les funcions que autoritzis. Pots canviar la teva elecció en qualsevol moment.',accept_btn_text:'Només necessàries',accept_all_btn_text:'Accepta-les totes',decline_btn_text:'Rebutja',settings_btn_text:'Configuració de galetes',preferences_btn_text:'Preferències',preferences_modal_heading:'Preferències de privacitat',preferences_modal_description:'Tria quines categories de galetes vols permetre. Les necessàries mantenen les funcions bàsiques del web.',reconsent_button_label:'Preferències de galetes',placeholder_description:'Aquest contingut està bloquejat perquè es connectaria a {service}.',placeholder_button_text:'Accepta i carrega'};
const categories={essential:['Galetes necessàries','Necessàries per al funcionament bàsic del web.'],functional:['Galetes funcionals','Permeten funcions com ara desar preferències.'],analytics:['Galetes analítiques','Permeten mesurar com es fa servir el web.'],marketing:['Galetes de màrqueting','Permeten mostrar publicitat segons els interessos.'],uncategorized:['Galetes sense classificar','Galetes que encara no s’han classificat.']};
const old=await fetch('/wp-json/surecookie/v1/admin/settings',{headers}).then(r=>r.json());
data.cookie_categories=old.data.cookie_categories;
for(const [key,value] of Object.entries(categories)){data.cookie_categories[key]={...data.cookie_categories[key],name:value[0],description:value[1]};}
const cookie=await fetch('/wp-json/surecookie/v1/admin/settings',{method:'POST',headers,body:JSON.stringify({data})}).then(async r=>({status:r.status,body:await r.json()}));
return {seo,cookieStatus:cookie.status,cookieSuccess:cookie.body.success};
});
fs.writeFileSync('/workspace/matchlearn-tools/deploy/seo-before.json',JSON.stringify(result.seo,null,2),{mode:0o600});console.log(JSON.stringify(result));await browser.close();})().catch(e=>{console.error(e.message);process.exit(1)});
