import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String description;
    private String password;

    @OneToOne(mappedBy = "user")
    private Portfolio portfolio;

    @OneToMany(mappedBy = "user")
    private List<Section> sections;

    @OneToMany(mappedBy = "user")
    private List<Card> cards;

    // Getters and Setters
}
