provider "aws" {
  region = "eu-west-3"
}

resource "aws_db_instance" "aurora_postgres" {
  identifier           = "auroratech-data-warehouse"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  db_name                 = "auroratech_db"
  username             = "admin"
  password             = "supersecretpassword!23"
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  publicly_accessible  = false

  tags = {
    Name        = "AuroraTech DW"
    Environment = "Production"
  }
}
