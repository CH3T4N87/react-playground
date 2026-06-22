const isLoggedIn = () => {
    const user = localStorage.getItem("token");
    return !!user;
}

export default {
    isLoggedIn
}