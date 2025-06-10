import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Inicializa a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para permitir acesso do frontend Angular
  app.enableCors({
    origin: 'http://localhost:4200', // origem do frontend Angular
    credentials: true, // permite autenticação
  });

  // Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('MotoWeb API')
    .setDescription('Documentação da API MotoWeb')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Cria e aplica a documentação Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // acessível via http://localhost:3000/api

  // Inicia a aplicação na porta 3000
  await app.listen(3000);
}
bootstrap();
