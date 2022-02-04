package com.thenetfish.jwtauth.message.response;

public class JwtResponse {
    private String token;
    private String username;
    private String type = "Bearer";

    public JwtResponse(String accessToken, String username) {
        this.token = accessToken;
        this.username = username;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
