import https from 'https';

export async function checkForLatestVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get('https://registry.npmjs.org/-/package/@dev-copilot/create-app/dist-tags', (res) => {
      let body = '';
      if (res.statusCode === 200) {
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          resolve(JSON.parse(body).latest);
        })
      } else {
        reject();
      }
    }).on('error', () => {
      reject();
    })
  })
}
