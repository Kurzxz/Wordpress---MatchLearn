const {open}=require('./admin.cjs');const fs=require('fs');
const root='/workspace/Wordpress---MatchLearn';
const pages=JSON.parse(fs.readFileSync('/workspace/matchlearn-tools/pages.json','utf8')).map(([slug,title,template])=>({slug,title,template,content:'',excerpt: title+' · MatchLearn. Reforç universitari i de FP superior, al teu ritme.'}));
for(const [slug,title]of[['privacitat','Privacitat i dades'],['cookies','Galetes']])pages.push({slug,title,content:fs.readFileSync(root+'/content/'+slug+'.html','utf8'),excerpt:title+' · Informació sobre el funcionament del web MatchLearn.'});
(async()=>{const {browser,page}=await open();await page.goto('https://matchlearn.cat/wp-admin/post.php?post=1859&action=edit',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!window.wpApiSettings?.nonce);
 const results=[];
 for(const definition of pages){const result=await page.evaluate(async(def)=>{
  const headers={'X-WP-Nonce':wpApiSettings.nonce,'Content-Type':'application/json'};
  const read=await fetch('/wp-json/wp/v2/pages?context=edit&slug='+encodeURIComponent(def.slug),{headers});if(!read.ok)throw Error('Cannot inspect page');const list=await read.json();
  const previous=list[0];if(previous?.template && previous.template!=='default' && previous.template!==def.template)throw Error('Existing page has another template: '+def.slug);
  const payload={...def,status:'publish'};if(previous)delete payload.content;
  const r=await fetch('/wp-json/wp/v2/pages'+(previous?'/'+previous.id:''),{method:'POST',headers,body:JSON.stringify(payload)});const data=await r.json();
  return {slug:def.slug,status:r.status,id:data.id,link:data.link,error:data.message,previous:previous||null};
 },definition);if(![200,201].includes(result.status))throw Error(JSON.stringify(result));
 if(result.previous)fs.writeFileSync('/workspace/matchlearn-tools/deploy/before-page-'+result.id+'.json',JSON.stringify(result.previous),{mode:0o600});delete result.previous;results.push(result);console.log('PAGE',result.slug,result.status,result.id);
 }
 const ids=Object.fromEntries(results.map(x=>[x.slug,x.id]));
 const settings=await page.evaluate(async(ids)=>{
  const headers={'X-WP-Nonce':wpApiSettings.nonce,'Content-Type':'application/json'};
  const before=await fetch('/wp-json/surecookie/v1/admin/settings',{headers}).then(r=>r.json());
  const css='\n/* MatchLearn */\n.surecookie-banner-inner{border:1px solid #dae1e9!important;border-radius:12px!important;box-shadow:0 12px 40px #192e5526!important;color:#192e55!important}.surecookie-accept-btn,.surecookie-accept-all-btn,.surecookie-decline-btn{background:#192e55!important;color:#fff!important;border:1px solid #192e55!important;border-radius:5px!important}.surecookie-btn-base:focus-visible{outline:3px solid #ef425b!important;outline-offset:3px!important}';
  const data={cookie_policy_page_id:ids.cookies,privacy_policy_page_id:ids.privacitat,custom_css:(before.data.custom_css||'').split('/* MatchLearn */')[0]+css};
  const cookie=await fetch('/wp-json/surecookie/v1/admin/settings',{method:'POST',headers,body:JSON.stringify({data})}).then(async r=>({status:r.status,body:await r.json()}));
  const seo=await fetch('/wp-json/surerank/v1/post/seo-settings?post_id=1859&post_type=page',{headers}).then(r=>r.json());
  const description='Troba reforç universitari i de FP superior en català. Consulta els tutors, tria un horari i prepara la teva pròxima classe amb MatchLearn.';
  const metaData={...seo.data,auto_generate_description:false,page_description:description,facebook_description:description,twitter_description:description};
  const updated=await fetch('/wp-json/surerank/v1/post/seo-settings',{method:'POST',headers,body:JSON.stringify({post_id:1859,metaData})});
  return {cookieStatus:cookie.status,cookieSuccess:cookie.body.success,seoStatus:updated.status};
 },ids);console.log('SETTINGS',JSON.stringify(settings));
 fs.writeFileSync(root+'/content/published-pages.json',JSON.stringify({pages:results,settings},null,2));await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
