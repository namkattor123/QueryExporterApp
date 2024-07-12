package net.javaguides.springboot.dto;

public class HomeDTO {
    public int userDBs;

    public int allDBs;

    public int userMetrics;

    public long allMetrics;

    public long userQueries;

    public long allQueries;

    public HomeDTO(int userDBs, int allDBs, int userMetrics, long allMetrics, long userQueries, long allQueries) {
        this.userDBs = userDBs;
        this.allDBs = allDBs;
        this.userMetrics = userMetrics;
        this.allMetrics = allMetrics;
        this.userQueries = userQueries;
        this.allQueries = allQueries;
    }
}
