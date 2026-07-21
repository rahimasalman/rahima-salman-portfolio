type Project = {
    slug: string,
    title: string,
    tech: string[],
    link : string,
}
export const projects: Project[] = [
    {slug: 'demo-issue-tracker', title: 'Demo Issue Tracker', tech: ['TypeScript', 'React'], link: 'https://github.com/rahimasalman/demo-issue-tracker'},
    {slug: 'react-tetris-game', title: 'React Tetris Game', tech: ['TypeScript', 'React'], link: 'https://github.com/rahimasalman/react-tetris-game'},
    {slug: 'rahima-yelpcamp', title: 'Rahima YelpCamp', tech: ['JavaScript', 'Node.js'], link: 'https://github.com/rahimasalman/rahima-yelpcamp'},
    {slug: 'vue-countdown-timer', title: 'Vue Countdown Timer', tech: ['JavaScript', 'Vue'], link: 'https://github.com/rahimasalman/vue-countdown-timer'},
]
