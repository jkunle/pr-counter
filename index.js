let options = {};

const e_type = document.getElementById('urlType');
const e_repos = document.getElementById('repos');
const e_authors = document.getElementById('authors');
const e_startDate = document.getElementById('start_date');
const e_endDate = document.getElementById('end_date');
const e_output = document.getElementById('output');
const e_generator = document.getElementById('generator');

const URL_MAX_LENGTH = 120;

function clickHandler() {
    let repos = e_repos.value.split(/\r?\n\r?/);
    let authors = e_authors.value.split(/\r?\n\r?/);
    let generated = generate(e_type.value, repos, authors, e_startDate.value, e_endDate.value);
    let link = document.createElement('a');
    link.href = generated;
    link.innerText = generated.length > URL_MAX_LENGTH ? generated.substr(0, URL_MAX_LENGTH - 3) + '...' : generated;
    while (e_output.firstChild) {
        e_output.removeChild(e_output.firstChild);
    }
    e_output.appendChild(link);
}

function generate(type, repos, authors, start, end) {
    return window.build((type ? type : 'search'), {
        repos: repos,
        authors: authors,
        start_date: start,
        end_date: end
    });
}

function dateToString(date) {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getUTCDate();
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}

function dateMinusDays(date, days) {
    let millis = days * 24 * 60 * 60 * 1000;
    return new Date(date.getTime() - millis);
}

function setupPage() {
    let today = new Date();
    let lastWeek = dateMinusDays(today, 7);
    e_startDate.value = dateToString(lastWeek);
    e_endDate.value = dateToString(today);
    e_generator.addEventListener('click', clickHandler, {
        passive: true
    })
}

if (typeof require == 'undefined') {
    setupPage();
}