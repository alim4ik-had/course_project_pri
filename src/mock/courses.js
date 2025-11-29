const courses = [
    {
        id: 1,
        title: "Веб-разработка для начинающих",
        description: "Изучите основы HTML, CSS и JavaScript для создания современных веб-сайтов",
        tasks : [
            {
                id: 1,
                title: "Изучить основы HTML",
                isComplete: true,
            },
            {
                id: 2,
                title: "Освоить CSS и Flexbox",
                isComplete: false,
            },
            {
                id: 3,
                title: "Познакомиться с JavaScript",
                isComplete: true,
            },
            {
                id: 4,
                title: "Создать первый проект",
                isComplete: true,
            },
        ],
        isFavorite: true,
        status: "in-progress",

    },
    {
        id: 2,
        title: "Python для анализа данных",
        description: "Научитесь использовать Python для обработки и анализа данных",
        tasks : [
            {
                id: 1,
                title: "Изучить основы Python",
                isComplete: true,
            }
        ],
        isFavorite: false,
        status: "completed",

    }
]

export {courses}