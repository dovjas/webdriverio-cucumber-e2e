import { Given,When,Then } from "@wdio/cucumber-framework";
import { expect } from 'chai';


Given(/^Google page is opened$/, function(){
    console.log('Before')
    browser.url('https://www.google.lt/');
    browser.pause(90000);
    console.log('After');
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log('searchItem', searchItem);
  let el = await $('[name="q"]');
  await el.setValue(searchItem);
  await browser.keys('Enter');
});
Then(/^Click on first search result$/, async function () {
    const firstResultLink = await $('//div[@id="search"]//a');
    await firstResultLink.click();
});

Then(/^URL should match (.*)$/,async function (expectedURL) {
    let url = await browser.getUrl();
    await expect(url).to.equal(expectedURL);
});

// Web interactions
Given(/^A page is opened$/,async function () {
    await browser.url('/inputs');
    await browser.setTimeout({ implicit:15000,pageLoad:10000 });
    await browser.maximizeWindow();
});

When(/^Perform web interactions$/,async function(){
    // 1.Input box
    let num =123;
    let numStr = num.toString();

    let inputEl = await $('[type=number]');
    await inputEl.setValue(numStr);
    browser.pause(3000);

    for(let i=0;i<numStr.length;i++){
        let charStr = numStr.charAt(i);
        await browser.pause(1000);
        await browser.keys(charStr);
    };
});

