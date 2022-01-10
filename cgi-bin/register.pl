#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;
binmode(STDOUT, ":utf8");

my $q = CGI->new;
print $q->header("text/xml;charset=UTF-8");

my $id = $q->param("id");
my $password = $q->param("password");
my $firstName = $q->param("firstName");
my $lastName = $q->param("lastName");

#Filtering the input
$id = filterInput($id);
$firstName = filterInput($firstName);
$lastName = filterInput($lastName);

if(defined($id) and defined($password) and defined($firstName) and defined($lastName) and $id and $password and $firstName and $lastName){
  my $dbh = makeConnection();
  if(checkIfIsRegistered($id, $dbh)) {
    #That user has already registered!
    showInvalidOutput();
  } else {
    #OK, I am gonna register the user
    addUser($id, $password, $firstName, $lastName, $dbh);
  }
} else {
  #Some of the arguments are missing!
  showInvalidOutput();
}

sub filterInput {
  my $input = $_[0];
  #Filtramos los Espaciados antes de la primera Letra
  $input =~ s/^( )+(.*)$/$2/g;
  #Filtramos los Espaciados después de la última Letra
  $input =~ s/^(.*)(\w)( )+$/$1$2/g;
  #Hacemos que una Cantidad de Espaciados Consecutivos sean
  #interpretados como uno
  $input =~ s/( )+/ /g;
  return $input;
}
sub makeConnection {
  my $user = "alumno";
  my $password = "pweb1";
  my $dsn = "DBI:MariaDB:database=tutoeasy;host=localhost";
  my $dbh = DBI->connect($dsn, $user, $password) or die("¡No se pudo conectar!");

  return $dbh;
}
sub checkIfIsRegistered {
  my $idQuery = $_[0];
  my $dbh = $_[1];

  my $sql = "SELECT * FROM Users WHERE id=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($idQuery);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  return @row;
}
sub addUser {
  my $id = $_[0];
  my $password = $_[1];
  my $firstName = $_[2];
  my $lastName = $_[3];
  my $dbh = $_[4];

  my $sql = "INSERT INTO Users (id, password, firstName, lastName) VALUES (?, ?, ?, ?)";
  my $sth = $dbh->prepare($sql);
  $sth->execute($id, $password, $firstName, $lastName);
  $sth->finish;

  print(renderXMLContent($id, $firstName, $lastName));
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
<?xml version='1.0' encoding='utf-8'?>
<user>
</user>
XML
}
