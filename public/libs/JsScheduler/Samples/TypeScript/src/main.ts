const links = document.querySelectorAll("#links a");
[...links].forEach(function (item)
{
    let href = item.getAttribute("href");

    fetch(href)
        .then(function (response)
        {
            if (response.ok)
            {
                return response.text();
            } else
            {
                return Promise.reject(response);
            }
        })
        .then(function (html)
        {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            document.querySelector('p#p' + href.replace(".html", "")).innerHTML = doc.querySelector("p#pinfo").innerHTML;
        })
        .catch(function (err)
        {
            // There was an error
            console.warn('Something went wrong.', err);
        });
});

