package com.amaro.apirestfulv1;

import com.amaro.apirestfulv1.model.Categoria;
import com.amaro.apirestfulv1.model.ProjetoSocial;
import com.amaro.apirestfulv1.model.Usuario;
import com.amaro.apirestfulv1.repository.CategoriaRepository;
import com.amaro.apirestfulv1.repository.ProjetoSocialRepository;
import com.amaro.apirestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class Apirestfulv1Application implements CommandLineRunner {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private ProjetoSocialRepository projetoSocialRepository;

	@Autowired
	CategoriaRepository categoriaRepository;

	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Usuario usuario = new Usuario(
				"admin",
				"admin",
				"senha"
		);

		usuarioRepository.save(usuario);

		Categoria educacao = new Categoria(
				"educacao",
				"educacao"
		);
		categoriaRepository.save(educacao);

		Categoria saude = new Categoria(
				"saude",
				"saude"
		);
		categoriaRepository.save(saude);

		Categoria inclusao = new Categoria(
				"inclusao",
				"inclusao"
		);
		categoriaRepository.save(inclusao);

		ProjetoSocial projetoSocial = new ProjetoSocial(
				"codigo.png",
				"Projeto Codigo do Futuro",
				"projetocodigodofuturo",
				"Aulas gratuitas de lógica de programação para adolescentes de comunidades carentes",
				true,
				"Instituto Ayrton Senna",
				"+55 (21) 9999-9999",
				BigDecimal.valueOf(200.50),
				LocalDate.of(1999, 4, 26),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"alfabetizacao.png",
				"Alfabetização para Todos",
				"alfabetizacaoparatodos",
				"Ensino básico de leitura e escrita para adultos em comunidades rurais",
				true,
				"Fundação Abrinq",
				"+55 (11) 9888-1234",
				BigDecimal.valueOf(150.00),
				LocalDate.of(2005, 3, 10),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"refeicoes.png",
				"Refeições do Bem",
				"refeicoesdobem",
				"Distribuição diária de refeições nutritivas para pessoas em situação de rua",
				true,
				"Ação Cidadania",
				"+55 (21) 9876-4321",
				BigDecimal.valueOf(300.00),
				LocalDate.of(2010, 9, 15),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"psicologia.png",
				"Cuidar é Viver",
				"cuidareviver",
				"Atendimento psicológico gratuito para jovens em situação de vulnerabilidade",
				true,
				"Associação Luz e Esperança",
				"+55 (31) 9988-5566",
				BigDecimal.valueOf(120.75),
				LocalDate.of(2012, 6, 5),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"nutricao.png",
				"Nutrição na Comunidade",
				"nutricaonacomunidade",
				"Educação alimentar e acompanhamento nutricional em comunidades periféricas",
				true,
				"Projeto Semente",
				"+55 (61) 9811-2233",
				BigDecimal.valueOf(180.00),
				LocalDate.of(2018, 1, 20),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"deficiencia.png",
				"Incluir é Amar",
				"incluirseamar",
				"Aulas de inclusão digital para pessoas com deficiência visual e auditiva",
				true,
				"ONG Ver com o Coração",
				"+55 (41) 9991-1122",
				BigDecimal.valueOf(220.00),
				LocalDate.of(2014, 11, 12),
				inclusao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"mulheres.png",
				"Empodera Mulher",
				"empoderamulher",
				"Oficinas de empreendedorismo e finanças para mulheres vítimas de violência",
				true,
				"Instituto Maria da Penha",
				"+55 (11) 9777-8888",
				BigDecimal.valueOf(320.00),
				LocalDate.of(2020, 3, 8),
				inclusao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"programacao.png",
				"Tech Jovem",
				"techjovem",
				"Capacitação em programação web para jovens de escolas públicas",
				true,
				"Fundação Estudar",
				"+55 (31) 9123-4567",
				BigDecimal.valueOf(190.00),
				LocalDate.of(2021, 5, 25),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"reabilitacao.png",
				"Renovo Vida",
				"renovovida",
				"Programa de reabilitação e reinserção social de dependentes químicos",
				true,
				"Comunidade Terapêutica Esperança",
				"+55 (27) 9345-6789",
				BigDecimal.valueOf(250.00),
				LocalDate.of(2015, 2, 14),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"dentessaudaveis.png",
				"Sorriso Saudável",
				"sorrisosaudavel",
				"Atendimento odontológico gratuito para crianças em comunidades carentes",
				true,
				"Associação Sorriso Feliz",
				"+55 (11) 98888-1122",
				BigDecimal.valueOf(230.00),
				LocalDate.of(2013, 9, 10),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"saudeidosos.png",
				"Saúde do Idoso",
				"saudedoidoso",
				"Atendimento médico e atividades físicas para idosos em comunidades periféricas",
				true,
				"Projeto Melhor Idade",
				"+55 (21) 97777-2233",
				BigDecimal.valueOf(280.00),
				LocalDate.of(2017, 5, 19),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"prevencao.png",
				"Prevenir é Viver",
				"prevenireviver",
				"Campanhas de prevenção de doenças e vacinação em comunidades rurais",
				true,
				"ONG Saúde para Todos",
				"+55 (31) 94444-3344",
				BigDecimal.valueOf(210.00),
				LocalDate.of(2020, 10, 30),
				saude
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"matematica.png",
				"Matemática Sem Medo",
				"matematicasemmedo",
				"Aulas de reforço em matemática para alunos do ensino fundamental",
				true,
				"Instituto Saber",
				"+55 (11) 96666-4455",
				BigDecimal.valueOf(175.00),
				LocalDate.of(2012, 3, 14),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"ingles.png",
				"Inglês para Todos",
				"inglesparatodos",
				"Curso gratuito de inglês básico para jovens de escolas públicas",
				true,
				"Fundação Nova Língua",
				"+55 (21) 95555-5566",
				BigDecimal.valueOf(200.00),
				LocalDate.of(2018, 8, 22),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"leiturainfantil.png",
				"Ler é Sonhar",
				"leresonhar",
				"Projeto de incentivo à leitura infantil em comunidades carentes",
				true,
				"Biblioteca Comunitária Esperança",
				"+55 (61) 97777-6677",
				BigDecimal.valueOf(160.00),
				LocalDate.of(2021, 1, 15),
				educacao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"autismo.png",
				"Inclusão Azul",
				"inclusaoazul",
				"Atividades de socialização e inclusão para crianças com autismo",
				true,
				"Associação Mundo Azul",
				"+55 (41) 93333-7788",
				BigDecimal.valueOf(250.00),
				LocalDate.of(2015, 4, 28),
				inclusao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"mulheresempreendem.png",
				"Mulheres em Ação",
				"mulheresemacao",
				"Capacitação e apoio para mulheres em situação de vulnerabilidade empreenderem",
				true,
				"Projeto Florescer",
				"+55 (11) 98888-8899",
				BigDecimal.valueOf(300.00),
				LocalDate.of(2019, 6, 7),
				inclusao
		);
		projetoSocialRepository.save(projetoSocial);

		projetoSocial = new ProjetoSocial(
				"esporteinclusivo.png",
				"Esporte para Todos",
				"esporteparatodos",
				"Atividades esportivas inclusivas para pessoas com deficiência",
				true,
				"ONG Movimento",
				"+55 (31) 95555-9900",
				BigDecimal.valueOf(220.00),
				LocalDate.of(2022, 2, 18),
				inclusao
		);
		projetoSocialRepository.save(projetoSocial);


	}
}
