import puppeteer from "puppeteer";

export async function takeScreenshot(url: string) {
  const browser = await puppeteer.launch({ 
    headless: false,
    executablePath: '/Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser',
    args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--allow-file-access-from-files'
    ]
  });
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/renderer.html`);

  await page.evaluate(async (url) => {
    const TIMEOUT = 3000;
    let resolve:any, reject: any;
    const promise = new Promise((res, rej) => [resolve, reject] = [res, rej]);
    //@ts-ignore
    const mv = document.getElementById('mv');
    mv.src = url;
    
    setTimeout(reject, TIMEOUT);
    mv.addEventListener('load', resolve);

    return promise;
  }, url)

  const mv = await page.$('#mv');
  let res;
  if (mv) {
    res = await mv.screenshot({ optimizeForSpeed: true })
  }
  await browser.close()
  return res;
}