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

	}
}
