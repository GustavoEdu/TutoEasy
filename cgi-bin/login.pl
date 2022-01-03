#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;
binmode(STDOUT, ":utf8");

my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

#¿Por qué no verificar estás entradas?: register.pl hará este trabajo.
#En consecuencia, la Salida estará siempre en un formato válido.
my $id = $q->param('id');
my $password = $q->param('password');

if(defined($id) and defined($password)) {
  my $dbh = makeConnection();
  if(checkLogin($id, $password, $dbh)) {
    successLogin($id, $dbh);    
  } else {
    showInvalidOutput();
  }
} else {
  showInvalidOutput();
}

sub makeConnection {
  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=tutoeasy;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  return $dbh;
}
sub checkLogin {
  my $idQuery = $_[0];
  my $passwordQuery = $_[1];
  my $dbh = $_[2];

  my $sql = "SELECT * FROM Users WHERE id=? AND password=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($idQuery, $passwordQuery);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  return @row;
}
sub successLogin {
  my $id = $_[0]; #The primary key
  my $dbh = $_[1];

  my $sql = "SELECT firstName, lastName FROM Users WHERE id=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($id);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  
  my $firstName = $row[0];
  my $lastName = $row[1];

  print renderXMLContent($id, $firstName, $lastName);
}
sub renderXMLContent {
  my $owner = $_[0];
  my $firstName = $_[1];
  my $lastName = $_[2];

  my $myXML = <<"XML";
<?xml version='1.0' encoding='utf-8'?>
<user>
  <owner>$owner</owner>
  <firstName>$firstName</firstName>
  <lastName>$lastName</lastName>
</user>
XML
  
  return $myXML;
}
sub showInvalidOutput {
  print <<"XML";
<?xml version='1.0' encoding='uft-8'?>
<user>
</user>
XML
}
