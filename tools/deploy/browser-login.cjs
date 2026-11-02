const {chromium}=require('playwright');
(async()=>{
 const p=process.env.HTTPS_PROXY||process.env.HTTP_PROXY;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox'],...(p?{proxy:{server:p}}:{})});
 const context=await browser.newContext();const page=await context.newPage();
 await page.goto('https://matchlearn.cat/wp-login.php',{waitUntil:'domcontentloaded',timeout:30000});
 console.log('Login form loaded:',await page.locator('#user_login').count());
 await page.locator('#user_login').fill(process.env.MATCHLEARN_WP_USER);
 await page.locator('#user_pass').fill(process.env.MATCHLEARN_WP_PASSWORD);
 const [response]=await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded',timeout:30000}),page.locator('#wp-submit').click()]);
 console.log('Browser login HTTP:',response?.status());
 const cookies=await context.cookies();
 const ok=cookies.some(c=>c.name.startsWith('wordpress_logged_in_'));
 console.log('Authenticated:',ok);
 if(ok){require('fs').writeFileSync('/tmp/matchlearn-wp-browser-session.json',JSON.stringify(await context.storageState()),{mode:0o600});}
 await browser.close();
})().catch(e=>{console.log('Browser check:',e.name, String(e.message).split('\n')[0]);process.exit(1)});
