// Base URL configuration
const BASE_URL = 'http://192.168.0.195/api';

// API endpoints
const ENDPOINTS = {
    REGISTER: '/register',
    POSTS: '/posts',
    COMMENTS: '/comments',
    USERS: '/users',
};

// Register User

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        return await response.json();
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

// Get all users
export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.USERS}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Get user by ID
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.USERS}/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Get all posts
export const getPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.POSTS}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.POSTS}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};