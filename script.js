function loadMilestones(individual, apiUrl) {
    const milestones = [
        { score: 0, name: "Beginner", image: "beginner.png" },
        { score: 50, name: "Intermediate", image: "intermediate.png" },
        { score: 100, name: "Advanced", image: "advanced.png" }
    ];
    
    const milestoneContainer = document.getElementById('milestones');
    milestoneContainer.innerHTML = '';

    // Fetch scores from Google Sheets
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let totalScore = 0;
            console.log(data); // Log the data to check its structure
            if (data.values) {
                data.values.forEach(row => {
                    const score = parseInt(row[0], 10);
                    if (!isNaN(score)) {
                        totalScore += score;
                    }
                });
            }

            document.getElementById('total-score').innerText = `Total Score: ${totalScore}`;

            milestones.forEach(milestone => {
                if (totalScore >= milestone.score) {
                    const milestoneElement = document.createElement('div');
                    milestoneElement.classList.add('milestone');
                    milestoneElement.innerHTML = `<h3>${milestone.name}</h3><img src="${milestone.image}" alt="${milestone.name}">`;
                    milestoneContainer.appendChild(milestoneElement);
                }
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}
