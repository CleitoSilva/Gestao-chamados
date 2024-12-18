# gestao-chamados
Aplicativo para gestão de chamados

# Ambiente de desenvolvimento

~~~
├── README.md       <- readme do projeto
│
├── server          <- api do projeto em C#
│
└── frontend        <- frontend do projeto em REACT TS
~~~

# Base de Dados

### Empresa

- IdEmpresa: UUID
- NomeEmpresa: Varchar(50)
- DescriçãoEmpresa: Varchar(75)

### Usuário

- IdUsuario: UUID
- Username: Varchar(50)
- NomeUsuario: Varchar(50)
- Email: Varchar(120)
- Senha: Varchar(120) # SHA256
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Area

- IdArea: Int (incremental)
- NomeArea: Varchar(50)
- DescriçãoArea: Varchar(75)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### SubArea

- IdSubArea: Int (incremental)
- NomeSubArea: Varchar(50)
- DescriçãoSubArea: Varchar(75)
- IdArea: Int (Chave estrangeira para Area)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Linha

- IdLinha: Int (incremental)
- NomeLinha: Varchar(50)
- DescriçãoLinha: Varchar(75)
- IdArea: Int (Chave estrangeira para Area)
- IdSubArea: Int (Chave estrangeira para SubArea) (NULLABLE)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Máquina

- IdMaquina: Int (incremental)
- NomeMaquina: Varchar(50)
- DescricaoMaquina: Varchar(75)
- IdLinha: Int (Chave estrangeira para Linha)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Componente

- IdComponente: Int (incremental)
- NomeComponente: Varchar(50)
- DescricaoComponente: Varchar(75)
- IdMaquina: Int (Chave estrangeira para Linha)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Categoria do Colaborador

- IdCategoria: Int (incremental)
- NomeCategoria: Varchar(50)
- DescricaoCategoria: Varchar(75)
- TipoCategoria: Int
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Categoria Técnica

- IdCategoriaTecnico: Int (incremental)
- NomeCategoriaTecnico: Varchar(50)
- DescricaoCategoriaTecnico: Varchar(75)
- TipoCategoriaTecnico: Int
- IdAreaLocalizacaoAbrangencia: Int (Chave estrangeira para Area)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Turno

- IdTurno: Int (incremental)
- DescricaoTurno: Varchar(50)
- HoraInicio: HourAndMinute
- HoraFim: HourAndMinute
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Colaborador

- IdColaborador: Int (incremental)
- NomeColaborador: Varchar(50)
- DescricaoColaborador: Varchar(75)
- IdCategoriaColaborador: Int (Chave estrangeira para Categoria do Colaborador)
- IdCategoriaTecnica: Int (Chave estrangeira para Categoria Técnica) (NULLABLE)
- IdTurno: Int (Chave estrangeira para turno)
- IdLinha: Int (Chave estrangeira para linha)
- CartãoRFID: Varchar(20)
- CartaoCracha: Varchar(20)
- ReColaborador: Varchar(20)
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Chamado

- IdChamado: Int (incremental)
- TempoTotalChamado: Floor
- TempoAguardoTecnicoChamado: Floor
- Tempo AtendimentoChamado: Floor
- IdColaboradorAberturaChamado: Int (Chave estrangeira para Colaborador)
- IdManutentorChamado: Int (Chave estrangeira para Colaborador)
- IdArea: Int (Chave estrangeira para Area)
- IdSubArea: Int (Chave estrangeira para SubArea) (NULLABLE)
- IdLinha: Int (Chave estrangeira para Linha)
- IdMaquina: Int (Chave estrangeira para Máquina)
- IdComponente: Int (Chave estrangeira para componente) (NULLABLE)
- Status do Chamado
- IdEmpresa: UUID (Chave estrangeira para Empresa)

### Eventos

- IdEvento: Int (incremental)
- CodigoEvento: Int
- NomeEvento: Varchar(50)
- HorarioEvento: Datetime
- MensagemEvento: Varchar(300)
- IdChamado: Int (Chave estrangeira para o Chamado)

### Entidade Base (Todas as entidades acima irão possuir esses atributos)

- CriadoPor: Varchar(50)
- CriadoEm: Datetime
- AlteradoPor: Varchar(50)
- AlteradoEm: Datetime
