const {open}=require('./admin.cjs');const fs=require('fs');
(async()=>{const {browser,page}=await open();await page.goto('https://matchlearn.cat/wp-admin/post.php?post=1859&action=edit',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!window.wpApiSettings?.nonce);
const result=await page.evaluate(async()=>{
const headers={'X-WP-Nonce':wpApiSettings.nonce,'Content-Type':'application/json'};
const seo=await fetch('/wp-json/surerank/v1/post/seo-settings?post_id=1859&post_type=page',{headers}).then(r=>r.json());
const description='Reforç universitari i de FP superior en català amb graduats recents. Aprèn al teu ritme amb MatchLearn. Projecte acadèmic amb reserves simulades.';
const metaData={...seo.data, page_title:'MatchLearn · Reforç universitari i de FP superior', auto_generate_description:false, page_description:description,facebook_title:'MatchLearn · Aprèn al teu ritme',facebook_description:description,twitter_title:'MatchLearn · Aprèn al teu ritme',twitter_description:description};
const updated=await fetch('/wp-json/surerank/v1/post/seo-settings',{method:'POST',headers,body:JSON.stringify({post_id:1859,metaData})}).then(async r=>({status:r.status,body:await r.json()}));
return {status:updated.status,success:updated.body.success};
});
console.log(JSON.stringify(result));await browser.close();})().catch(e=>{console.error(e.message);process.exit(1)});
