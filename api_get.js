const apiUrl = 'https://api.npaw.com/powerce/data?fromDate=last6hours&type=all&filter=%5B%7B%22name%22%3A%22My%20IP%22%2C%22rules%22%3A%7B%22ip%22%3A%5B%22187.190.4.127%22%5D%7D%7D%5D&granularity=hour&metrics=views&groupBy=user,ip&orderBy=views&limit=5&orderDirection=desc&dateToken=1777244103854&token=9e35289491d7cf45d5ebd1ee622e5f13'; // ← REPLACE THIS!

async function fetchAndDisplayData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const tableBody = document.querySelector('#live-data-table tbody');
        tableBody.innerHTML = ''; // Clear old rows

        if (data && data.data && Array.isArray(data.data)) {
            data.data.forEach(entry => {
                let ip = 'N/A';
                let userId = 'N/A';
                let views = 0;

                if (entry.dimensionsInfo) {
                    entry.dimensionsInfo.forEach(dim => {
                        if (dim.code === 'ip') {
                            ip = dim.values[0];
                        } else if (dim.code === 'user') {
                            userId = dim.values[0];
                        }
                    });
                }

                if (entry.metrics && entry.metrics.length > 0) {
                    let metric = entry.metrics.find(m => m.code === 'views');
                    if (metric && metric.values && metric.values.length > 0 && metric.values[0].data.length > 0) {
                        views = metric.values[0].data.reduce((sum, datapoint) => sum + datapoint[1], 0);
                    }
                }

                const row = `<tr>
                    <td>${userId}</td>
                    <td>${ip}</td>
                    <td>${views}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="3">No data available</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching live data:', error);
        document.querySelector('#live-data-table tbody').innerHTML = '<tr><td colspan="3">Error fetching data</td></tr>';
    }
}

// Initial load
fetchAndDisplayData();
// Refresh every 10 seconds
setInterval(fetchAndDisplayData, 10000);
