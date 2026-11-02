const {chromium}=require('playwright');
const base=process.env.ML_TEST_URL||'http://127.0.0.1:9400';
(async()=>{
 const remote=base.startsWith('https:');
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox'],...(remote?{proxy:{server:process.env.HTTPS_PROXY||process.env.HTTP_PROXY}}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const goto=async path=>{const r=await page.goto(base+path+(path.includes('?')?'&':'?')+'ml-test='+Date.now(),{waitUntil:'networkidle'});if(r.status()!==200)throw Error('HTTP '+r.status()+' '+path);const cookie=page.getByRole('button',{name:/^(Only Essential|Només necessàries)$/});if(await cookie.count())await cookie.click();};
 await goto('/');
 if(await page.locator('.demo-bar').count())throw Error('Old banner');
 if(await page.locator('html').getAttribute('lang')!=='ca')throw Error('Language');
 if(!await page.locator('#credits').count())throw Error('Credits');
 for(const path of ['/materies/','/projecte/','/com-funciona/','/preguntes-frequents/','/tutors/']){await goto(path);if(await page.locator('h1').count()!==1)throw Error('Heading '+path);}
 await goto('/materies/');await page.locator('[data-filter="soc"]').click();if(await page.locator('.subject-card:visible').count()!==2)throw Error('Filter');await page.locator('[data-filter="all"]').click();await page.locator('#subject-search').fill('programacio');if(await page.locator('.subject-card:visible').count()!==1)throw Error('Search');
 await page.locator('.subject-card:visible').click();await page.waitForURL('**/reserva/**');if(await page.locator('#booking-subject').inputValue()!=='Programació')throw Error('Subject transfer');
 await goto('/tutor-aleix/');
 if(await page.locator('.calendar-slot').count()!==20)throw Error('Calendar size');
 const selected=page.locator('.calendar-slot:not(:disabled)').first();await selected.click();if(await selected.getAttribute('aria-pressed')!=='true')throw Error('Calendar state');await page.locator('#calendar-book').click();await page.waitForURL('**/reserva/**');
 if(!await page.locator('#booking-date').inputValue()||!await page.locator('#booking-slot').inputValue())throw Error('Slot transfer');
 await page.locator('#booking-duration').selectOption('2');if(await page.locator('#booking-slot option').count()!==1)throw Error('Invalid two-hour slot permitted');
 await page.locator('#booking-date').selectOption({index:3});await page.locator('#booking-slot').selectOption('17');
 await page.getByRole('button',{name:'Revisa la reserva'}).click();if(!(await page.locator('#payment-summary').textContent()).includes('24,00'))throw Error('Price');
 await page.locator('#confirm-payment').click();if(!await page.locator('#saved-session').isVisible())throw Error('Session storage');
 await page.locator('#enter-classroom').click();await page.locator('#finish-classroom').click();await page.locator('#feedback-form select').selectOption({index:1});await page.locator('#feedback-form button').click();if(!await page.locator('#feedback-message').isVisible())throw Error('Feedback');
 await page.reload({waitUntil:'networkidle'});if(!await page.locator('#saved-session').isVisible())throw Error('Persistence');await page.locator('#cancel-session').click();if(await page.locator('#saved-session').isVisible())throw Error('Cancel');
 await goto('/fes-te-tutor/');await page.locator('#tutor-form select').first().selectOption({index:1});await page.locator('#tutor-form input[type=checkbox]').check();await page.locator('#tutor-form button').click();if(!await page.locator('#tutor-success').isVisible())throw Error('Tutor flow');
 await page.setViewportSize({width:390,height:844});
 for(const path of ['/','/tutor-aleix/','/reserva/','/tutors/']){await goto(path);if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+path);}
 await page.getByRole('button',{name:'Menú'}).click();if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='true')throw Error('Menu');await page.getByRole('link',{name:'Matèries',exact:true}).click();await page.waitForURL('**/materies/**');
 if(errors.length)throw Error(errors.join('\n'));console.log('PASS: 9 pages, Catalan, links, subject search, profile calendar, slot transfer, duration validation, booking, session storage/reload/cancel, classroom, feedback, tutor flow, mobile menu and layout; no JS errors.');
 await page.setViewportSize({width:1440,height:1000});await goto('/tutor-aleix/');await page.screenshot({path:'/workspace/Wordpress---MatchLearn/dist/matchlearn-tutor.png',fullPage:true});
 await goto('/reserva/');await page.screenshot({path:'/workspace/Wordpress---MatchLearn/dist/matchlearn-reserva.png',fullPage:true});
 await goto('/');await page.screenshot({path:'/workspace/Wordpress---MatchLearn/dist/matchlearn-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await goto('/');await page.screenshot({path:'/workspace/Wordpress---MatchLearn/dist/matchlearn-mobile.png',fullPage:true});
 await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
