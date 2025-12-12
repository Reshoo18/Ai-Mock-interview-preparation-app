export const BASE_URL="http://localhost:8000";

export const API_PATH={
    AUTH:{
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
    },

    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

    AI:{
        GENERATE_QUESTION: "/api/ai/grnerate-questions",
        GENERATE_EXPLAINATION: "api/ai/generate-explanation",
    },

    SESSION:{
        CREATE:"/api/sessions/create",
        GET_ALL:"/api/sessions/my-sessios",
        GET_ONE: (id)=>`/api/sessions/${id}`,
        DELETE: (id)=>`/api/sessions/${id}`
    },

    QUESTIONS:{
        ADD_TO_SESSIONS: "/api/questions/add",
        PIN: (id)=>`/api/questions/${id}/pin`,
        UPDATE_NONE: (id)=>`/api/questions/${id}/note`
    },

};