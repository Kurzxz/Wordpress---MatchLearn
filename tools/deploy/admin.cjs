const {chromium}=require('playwright');
exports.open=async()=>{
 const proxy=process.env.HTTPS_PROXY||process.env.HTTP_PROXY;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox'],...(proxy?{proxy:{server:proxy}}:{})});
 const context=await browser.newContext({storageState:'/tmp/matchlearn-wp-browser-session.json'});
 const page=await context.newPage();return {browser,context,page};
};
