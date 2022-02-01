Come web hosting locale consigliamo XAMPP v.3.3 per evitare errori derivanti ad incompatibilità.

1). Aprire XAMPP ed avviare Apache e Mysql

2). In phpMyAdmin importare il database "thenetfish" situato nella cartella principale del progetto

3). ANGULAR:

		- Aprire il progetto Angular dalla cartella "Frontend" e da terminale inviare il comando:
			npm install
		- Avvia il servizio con:
			npm start

4). NODE.JS:

		- Aprire il progetto Node.js dalla cartella "Backend" e da terminale inviare il comando:
			npm install
		- Spostarsi all'interno della cartella ./config/config.json. Modificare i dati di accesso al database se diversi da quelli già esistenti.
		- Avvia il servizio con:
			npm start

5). DOTNET:

		- Aprire la solution presente nella cartella "BackendDotnet".

		- Una volta aperto il progetto se presente eliminare la cartella Migrations nel progetto FilmComments.DB

		- Utilizzando la shell o il terminale spostarsi nel path ./FilmComments.DB/DbContextManager.cs e copiare la seguente stringa nel connectionString se non presente. All'occorrenza è neccessario modificare i dati della stringa per il corretto funzionamento del progetto.

			"Server=localhost;Port=3306;Database=thenetfish;Uid=root;Psw=password;"

		- Dal terminale lanciare i seguenti comandi:
  
			dotnet ef migrations list

			dotnet ef migrations add Creazione_Tabella

			dotnet ef database update

		- Aprire la solution e premere con il tasto destro FilmComments.RestAPIs e impostarlo come progetto di avvio



	Tip: 

		- Nel caso in cui i comandi non vengano lanciati con errore MSB4024 seguire i passaggi:

			Andare su File e scegliere Apri -> Cartella...

			Aprire la cartella .\BackendDotnet

			Dall'esplora soluzioni recarsi in .\src\FilmComments.DB\obj e aprire il file FilmComments.DB.csproj.EntityFrameworkCore.targets

			Verificare la presenza di errori e in caso positivo rimuovere le righe di codice interessate

6). LARAVEL:

		- Aprire il progetto Laravel dalla cartella "rating" che dovrà essere inserita nella cartella htdocs di XAMPP (.\Percorso scelto\xampp\htdocs)

		- Una volta aperto Laravel con Visual Studio Code o Intellij rinominare il file ".env.example" in ".env"

		- Aprire il file e all'occorenza modificarlo con i propri dati di accesso al db per assicurare il corretto funzionamento del progetto.

		- Da terminale posizionarsi nella cartella "rating" e lancaire i seguenti comandi:

			composer install or composer update

			npm install

			php artisan migrate

			php artisan serve

7). SPRING BOOT:

		- Aprire il progetto SpringBoot dalla cartella "jwtauth" con Intellij

		- Posizionarsi nel path ./src/resources/application.properties e all'occorenza modificare il file con i propri dati di accesso al db per assicurare il corretto funzionamento del progetto.

		- Avviare il servizio
