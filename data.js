export const users = [
    {
        id: 1,
        username: "bob",
        name: "Bob",
        location: "USA",
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq'
    },
    {
        id: 2,
        username: "alice",
        name: "Alice",
        location: "Sweden",
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq'
    },
    {
        id: 3,
        username: "john",
        name: "John",
        location: "France",
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq'
    },
];

export const posts = [
    {
        id: 1,
        userId: 1,
        text: "Hello, World!"
    },
    {
        id: 2,
        userId: 2,
        text: "Hello, NextJS"
    },
    {
        id: 3,
        userId: 1,
        text: "Lorem ipsum dolor sit amet. "
    },
    {
        id: 4,
        userId: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut rhoncus neque. Sed lacinia magna a mi tincidunt, ac interdum."
    }
];

export const comments = [
    {
        id: 1,
        postId: 1,
        userId: 2,
        text: "Hi there!"
    },
    {
        id: 2,
        postId: 1,
        userId: 3,
        text: "Lorem ipsum"
    },
    {
        id: 3,
        postId: 2,
        userId: 1,
        text: "Nulla bibendum risus sed vestibulum lobortis. Fusce."
    },
    {
        id: 4,
        postId: 2,
        userId: 1,
        text: "In ut nulla vitae dolor scelerisque lacinia. "
    },
    {
        id: 5,
        postId: 2,
        userId: 1,
        text: "Praesent semper enim eu ligula rutrum finibus."
    },
]